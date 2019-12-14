package com.jdlink.controller;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.EmailUtil;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.domain.User;
import com.jdlink.service.UserService;
import com.jdlink.service.produce.ApprovalManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class ApprovalManageController {

    @Autowired
    ApprovalManageService approvalManageService;
    @Autowired
    UserService userService;

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("searchApprovalManageTotal")
    @ResponseBody
    public int SearchApprovalManageTotal(@RequestBody ApprovalProcess approvalProcess) {
        try {
            return approvalManageService.searchTotal(approvalProcess);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取分页数据
     *
     * @param approvalProcess
     * @return
     */
    @RequestMapping("searchApprovalManage")
    @ResponseBody
    public String SearchApprovalManage(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<ApprovalProcess> approvalProcessList = approvalManageService.search(approvalProcess);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(approvalProcessList.toArray(new ApprovalProcess[approvalProcessList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }


    /*审批公共方法*/
    @RequestMapping("publicApproval")
    @ResponseBody
    public String publicApproval(String orderId, String roleId, String approvalAdvice, HttpSession session) {

        JSONObject res = new JSONObject();

        try {
            User user = (User) session.getAttribute("user");
            String userName = user.getName();
            //1根据订单号找出审批流对象,再找出节点列表
            ApprovalProcess approvalProcess = approvalManageService.getApprovalProcessByOrderId(orderId);
            if (approvalProcess != null) {
                //在根据角色编号和审批流主键找出相应的节点
                //本节点
                ApprovalNode approvalNode = approvalManageService.getNodeByIdAndRoleId(approvalProcess.getId(), roleId);
                //找出他的子节点是否是1通过
                //子节点
                ApprovalNode approvalNode3 = approvalManageService.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalProcess.getId(), approvalNode.getId());
                //父节点
                //1找到父节点
                ApprovalNode approvalNode1 = approvalManageService.getApprovalNodeById(approvalNode.getApprovalPId());
                //如果子节点不存在就是根节点无法审批
                if (approvalNode3 != null) { //不是根节点
                    if (approvalNode1 != null) {
                        if (approvalNode.getApprovalState() == 1) {
                            res.remove("message");
                            res.put("message", "当前级别已审批无法审批");
                        } else if (approvalNode3.getApprovalState() != 1 && approvalNode3.getApprovalState() != 5) {
                            res.remove("message");
                            res.put("message", "下级未审批或提交当前无法审批");
                        } else if (approvalNode.getApprovalState() != 2 && approvalNode.getApprovalState() != 7) {
                            res.remove("message");
                            res.put("message", "发起人无法提交");
                        } else if (approvalNode1.getApprovalState() == 1) {
                            res.remove("message");
                            res.put("message", "上级已审批,当前无法审批");
                        } else if ((approvalNode.getApprovalState() == 2 || approvalNode.getApprovalState() == 7) && (approvalNode1.getApprovalState() == 3 || approvalNode1.getApprovalState() == 7 || approvalNode1.getApprovalState() == 0) && (approvalNode3.getApprovalState() == 1 || approvalNode3.getApprovalState() == 5)) {

                            //假设有父节点跟新父节点状态为审批中
                            approvalManageService.updateApprovalById(approvalNode1.getId(), 2, approvalNode1.getApprovalAdvice(), approvalNode1.getUserName(), approvalNode1.getApprovalDate());
                            //更新本节点状态为通过
                            approvalManageService.updateApprovalById(approvalNode.getId(), 1, approvalAdvice, userName, new Date());
                            // 发送邮件给下一审批人
                            List<User> userList = userService.getUserListByRoleId(approvalNode1.getRoleId());
                            for (User user1 : userList) {
                                if (user1.getEmail() != null && !user1.getEmail().equals("")) {
                                    User companyEmail = userService.getCompanyEmail();
                                    EmailUtil.sendEmail(user1.getEmail(), user1.getName(), orderId, companyEmail);   // 发送邮件
                                }
                            }
                            res.remove("message");
                            res.put("message", "审批通过");
                        }


                    } else if (approvalNode1 == null) {
                        if (approvalNode.getApprovalState() == 1) {
                            res.remove("message");
                            res.put("message", "当前级别已审批无法审批");
                        } else if (approvalNode3.getApprovalState() != 1 && approvalNode3.getApprovalState() != 5) {
                            res.remove("message");
                            res.put("message", "下级未审批当前无法审批");
                        } else if (approvalNode.getApprovalState() != 2 && approvalNode.getApprovalState() != 7) {
                            res.remove("message");
                            res.put("message", "发起人无法提交");
                        } else if ((approvalNode.getApprovalState() == 2 || approvalNode.getApprovalState() == 7) && (approvalNode3.getApprovalState() == 1 || approvalNode3.getApprovalState() == 5)) {
                            approvalManageService.updateApprovalById(approvalNode.getId(), 1, approvalAdvice, userName, new Date());

                            res.put("message", "审批通过");
                        }

                    }


                } else if (approvalNode3 == null) {
                    res.remove("message");
                    res.put("message", "发起人无法审批");
                }


                res.put("status", "success");

            }


        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审批失败");
        }
        return res.toString();
    }

    /*提交公共方法*/
    @RequestMapping("publicSubmit")
    @ResponseBody
    public String publicSubmit(String orderId, String userName, String url, String roleId) {
        JSONObject res = new JSONObject();
        try {
            String message = approvalManageService.publicSubmit(orderId, userName, url, roleId);
//        ApprovalProcess approvalProcess=approvalManageService.getApprovalProcessFlowByOrderId(orderId);
//        if(approvalProcess==null){
//            res.put("message", "提交失败,仅发起人提交");
//        }
            res.put("message", message);
            res.put("status", "success");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }

    /**
     * 获取网页链接数据
     *
     * @return
     */
    @RequestMapping("getUrlList")
    @ResponseBody
    public String getUrlList() {
        JSONObject res = new JSONObject();
        try {
            // 取出数据
            List<Organization> organizationList = approvalManageService.getUrlList();
            // 转化json格式传输
            JSONArray array = JSONArray.fromArray(organizationList.toArray(new Organization[organizationList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    /**
     * 根据Id获取审批流模板数据数据
     *
     * @param id
     * @return
     */
    @RequestMapping("getApprovalProcessModelById")
    @ResponseBody
    public String getApprovalProcessModelById(int id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            ApprovalProcess approvalProcess = approvalManageService.getApprovalProcessModelById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(approvalProcess);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 删除审批流
     *
     * @param id
     * @return
     */
    @RequestMapping("deleteApprovalProcessModelById")
    @ResponseBody
    public String deleteApprovalProcessModelById(int id) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.deleteModelById(id);  // 删除审批流
            res.put("status", "success");
            res.put("message", "删除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

    /**
     * 修改审批流及节点数据
     *
     * @param approvalProcess
     * @return
     */
    @RequestMapping("updateApprovalProcessModelById")
    @ResponseBody
    public String updateApprovalProcessModelById(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.updateModelProcessById(approvalProcess);  // 修改审批流及节点
            res.put("status", "success");
            res.put("message", "修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败！");
        }
        return res.toString();
    }

    /**
     * 新增审批流模板
     *
     * @param approvalProcess
     * @return
     */
    @RequestMapping("addApprovalModel")
    @ResponseBody
    public String addApprovalModel(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.addApprovalModel(approvalProcess);  // 修改审批流及节点
            res.put("status", "success");
            res.put("message", "新增成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败！");
        }
        return res.toString();
    }

    /**
     * 更新审批流模型绑定的url
     *
     * @param approvalProcess
     * @return
     */
    @RequestMapping("updateApprovalProcessModelUrlById")
    @ResponseBody
    public String updateApprovalProcessModelUrlById(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.updateApprovalProcessModelUrlById(approvalProcess);  // 修改审批流及节点
            res.put("status", "success");
            res.put("message", "修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败！");
        }
        return res.toString();
    }

    /**
     * 根据角色ID待办审批流数据
     *
     * @param
     * @return
     */
    @RequestMapping("getOrderIdAndUrlByRoleId")
    @ResponseBody
    public String getOrderIdAndUrlByRoleId(@RequestBody ApprovalProcess approvalProcess, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                List<ApprovalNode> approvalNodeList = new ArrayList<>();
                ApprovalNode approvalNode = new ApprovalNode();
                approvalNodeList.add(approvalNode);
                approvalNode.setRoleId(user.getRole().getId());
                approvalProcess.setApprovalNodeList(approvalNodeList);
            }
            //根据id查询出相应的对象信息
            List<ApprovalProcess> approvalProcess1 = approvalManageService.getOrderIdAndUrlByRoleId(approvalProcess);
            //新建一个对象并给它赋值
//            JSONObject data = JSONObject.fromBean(approvalProcess1);
            res.put("data", approvalProcess1);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /*查询待办事项总数*/
    @RequestMapping("getOrderIdAndUrlByRoleIdCount")
    @ResponseBody
    public int getOrderIdAndUrlByRoleIdCount(@RequestBody ApprovalProcess approvalProcess, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List<ApprovalNode> approvalNodeList = new ArrayList<>();
            ApprovalNode approvalNode = new ApprovalNode();
            approvalNodeList.add(approvalNode);
            approvalNode.setRoleId(user.getRole().getId());
            approvalProcess.setApprovalNodeList(approvalNodeList);
        }
        return approvalManageService.getOrderIdAndUrlByRoleIdCount(approvalProcess);

    }

    /*根据单号和角色Id 获取该节点及所有子节点*/
    @RequestMapping("getAllChildNode")
    @ResponseBody
    public String getAllChildNode(String orderId, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            ApprovalProcess approvalProcess = approvalManageService.getApprovalProcessByOrderId(orderId);
//            User user=(User)session.getAttribute("user");
//            if(user!=null){
//                ApprovalNode approvalNode=approvalManageService.getApprovalNodeByOrderIdAndRoleId(orderId,user.getRole().getId());
//                List<ApprovalNode> approvalNodeList=getAllChildApprovalNode(approvalNode);
            res.put("data", approvalProcess.getApprovalNodeList());
            res.put("status", "success");
            res.put("message", "子节点查询成功");
//            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "子节点查询失败");
        }
        return res.toString();
    }

    /*根据当前节点获取所有的子节点*/
    public List<ApprovalNode> getAllChildApprovalNode(ApprovalNode approvalNode) {
        int approvalProcessId = approvalNode.getApprovalProcessId();//审批流主键
        List<ApprovalNode> approvalNodeList = new ArrayList<>();
//        approvalNodeList.add(approvalNode);
        ApprovalNode approvalNode1 = approvalNode;
        ApprovalNode approvalNode2 = null;
        while (approvalManageService.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalProcessId, approvalNode1.getId()) != null) {
            approvalNode2 = approvalManageService.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalProcessId, approvalNode1.getId());
            approvalNodeList.add(approvalNode2);
            approvalNode1 = approvalNode2;
        }

        return approvalNodeList;
    }

    @RequestMapping("getApprovalNodeByOrderIdAndRoleId")
    @ResponseBody
    public String getApprovalNodeByOrderIdAndRoleId(String orderId, int roleId) {
        JSONObject res = new JSONObject();

        try {
            ApprovalNode approvalNode = approvalManageService.getApprovalNodeByOrderIdAndRoleId(orderId, roleId);
            res.put("data", approvalNode);
            res.put("status", "success");
            res.put("message", "查询子节点成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询子节点失败");
        }

        return res.toString();
    }

    @RequestMapping("selectSupremeNodeByOrderId")
    @ResponseBody
    public Boolean selectSupremeNodeByOrderId(String orderId) {
        JSONObject res = new JSONObject();
        ApprovalNode approvalNode = approvalManageService.selectSupremeNodeByOrderId(orderId);
        if (approvalNode.getApprovalState() == 1) {
            return true;

        } else {
            return false;

        }

    }

    /*驳回公共方法*/
    @RequestMapping("publicBack")
    @ResponseBody
    public String publicBack(String orderId, int roleId, String approvalAdvice, int radio) {
        JSONObject res = new JSONObject();

        try {
            String message = approvalManageService.publicBack(orderId, roleId, approvalAdvice, radio);

            res.put("status", "success");
            res.put("message", message);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "驳回失败");
        }

        return res.toString();
    }

}
