package com.jdlink.service.produce.impl;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.produce.ApprovalManageMapper;
import com.jdlink.service.produce.ApprovalManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ApprovalManageServiceImpl implements ApprovalManageService {

    @Autowired
    ApprovalManageMapper approvalManageMapper;
    @Override
    public List<ApprovalProcess> search(ApprovalProcess approvalProcess){ return approvalManageMapper.search(approvalProcess); }

    @Override
    public int searchTotal(ApprovalProcess approvalProcess) { return approvalManageMapper.searchTotal(approvalProcess); }

    @Override

    public ApprovalProcess getApprovalProcessByOrderId(String orderId) {
        return approvalManageMapper.getApprovalProcessByOrderId(orderId);
    }

    @Override
    public ApprovalNode getNodeByIdAndRoleId(int id, String roleId) {
        return approvalManageMapper.getNodeByIdAndRoleId(id, roleId);
    }

    @Override
    public void updateApprovalById(String id, int stateId) {
        approvalManageMapper.updateApprovalById(id, stateId);
    }

    public List<Organization> getUrlList() {
        return approvalManageMapper.getUrlList();
    }

    @Override
    public ApprovalProcess getApprovalProcessModelById(int id) { return approvalManageMapper.getApprovalProcessModelById(id); }

    @Override
    public void deleteModelById(int id) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(id);   // 删除节点
        approvalManageMapper.deleteModelProcessByApprovalProcessId(id);   // 删除流
    }

    @Override
    public void updateModelProcessById(ApprovalProcess approvalProcess) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(approvalProcess.getId());   // 删除节点
        approvalManageMapper.updateApprovalProcessById(approvalProcess);   // 更新审批流外层数据
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                 approvalManageMapper.addApprovalNode(approvalNode);   // 新增节点
            }
        }

    }

    @Override
    public void addApprovalModel(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalProcess(approvalProcess);
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                approvalManageMapper.addApprovalNode(approvalNode);
            }
        }
    }

    @Override
    public void updateApprovalProcessModelUrlById(ApprovalProcess approvalProcess) {
        approvalManageMapper.deleteUrlByApprovalProcessId(approvalProcess.getId());   // 删除之前链接
        approvalManageMapper.addApprovalProcessModelUrl(approvalProcess);           // 新增当前的链接
    }


    @Override
    public ApprovalProcess getModelProcessByUrl(String url) {
        return approvalManageMapper.getModelProcessByUrl(url);
    }

    @Override
    public void publicSubmit(String orderId, String userName, String url,String roleId) {
        //根据url找出审批流对象
        ApprovalProcess approvalProcess=approvalManageMapper.getModelProcessByUrl(url);
        //创建实际的审批流对象设置相关的信息 1订单号,2创建人
        ApprovalProcess approvalProcess1=new ApprovalProcess();
        approvalProcess1.setOrderId(orderId);
        approvalProcess1.setCreator(userName);
        approvalProcess1.setUrl(url);
           approvalManageMapper.addApprovalFlow(approvalProcess1);
        //审批流新增
        /*================================*/
        //订单明细的更新
        //获取最新的审批流对象
        ApprovalProcess approvalProcess2=approvalManageMapper.getNewestApprovalProcessByCreateTime();
         List<ApprovalNode> approvalNodeList=approvalProcess.getApprovalNodeList();
        List<ApprovalNode> approvalNodeList1=new ArrayList<>();
        for(int i=0;i<approvalNodeList.size();i++){
            ApprovalNode approvalNode=new ApprovalNode();
            approvalNode.setApprovalProcessId(approvalProcess2.getId());//绑定审批流对象
            approvalNode.setRoleId(approvalNodeList.get(i).getRoleId());//绑定角色
            if(approvalNodeList.get(i).getRoleId()==Integer.parseInt(roleId)){ //创建人
                approvalNode.setUserName(userName);
                approvalNode.setApprovalPId(approvalProcess2.getId()+"-"+approvalNodeList.get(i).getApprovalPId());
            }
//            else {
//                //绑定父节点
//
//            }
            //绑定主键
            approvalNode.setId(approvalProcess2.getId()+"-"+approvalNodeList.get(i).getId());
            approvalNodeList1.add(approvalNode);
        }
        for(int i=0;i<approvalNodeList1.size();i++){
            //跟新审批节点
            approvalManageMapper.updateApprovalNode(approvalNodeList1.get(i));
        }

        //本节点已提交
         //查询本节点
        ApprovalNode approvalNode=approvalManageMapper.getApprovalNodeByNullApprovalPId(approvalProcess2.getId(),Integer.parseInt(roleId));
        approvalManageMapper.updateApprovalById(approvalNode.getId(),5);
        //父节点审批中
        approvalManageMapper.updateApprovalById(approvalNode.getApprovalPId(),2);
    }

    @Override
    public void addApprovalFlow(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalFlow(approvalProcess);
    }

    @Override
    public ApprovalProcess getNewestApprovalProcessByCreateTime() {
        return approvalManageMapper.getNewestApprovalProcessByCreateTime();
    }

    @Override
    public void updateApprovalNode(ApprovalNode approvalNode) {
        approvalManageMapper.updateApprovalNode(approvalNode);
    }

    @Override
    public ApprovalNode getApprovalNodeByNullApprovalPId(int approvalProcessId,int roleId) {
        return approvalManageMapper.getApprovalNodeByNullApprovalPId(approvalProcessId,roleId);
    }

    @Override
    public ApprovalProcess getOrderIdAndUrlByRoleId(int id) {
        return approvalManageMapper.getOrderIdAndUrlByRoleId(id);
    }

}
