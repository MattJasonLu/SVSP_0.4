package com.jdlink.controller;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.service.WayBillService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class PRWayBillController {

    @Autowired
    WayBillService wayBillService;

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalWayBillRecord")
    @ResponseBody
    public int totalWayBillRecord() {
        try {
            return wayBillService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageWayBillList")
    @ResponseBody
    public String loadPageWayBillList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<WayBill> wayBillList = wayBillService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(wayBillList.toArray(new WayBill[wayBillList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    @RequestMapping("getWayBill")
    @ResponseBody
    public String getWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            WayBill wayBill = wayBillService.getById(id);
            //新建一个对象并给它赋值为wayBill
            JSONObject data = JSONObject.fromBean(wayBill);
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
     * 获取目前的接运单编号
     *
     * @return
     */
    @RequestMapping("getCurrentWayBillId")
    @ResponseBody
    public String getCurrentWayBillId() {
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date);
        int count = wayBillService.countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (wayBillService.getById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @param tableName
     * @param id
     * @return
     */
    @RequestMapping("importWayBillExcel")
    @ResponseBody
    public String importWayBillExcel(MultipartFile excelFile, String tableName, String id) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            db.importExcel(excelFile, tableName, id);
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();

    }

    @RequestMapping("getWayBillSeniorSelectedList")
    @ResponseBody
    public String getWayBillSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.ToExamine, CheckState.Examining, CheckState.Approval, CheckState.Backed};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    @RequestMapping("searchWayBillTotal")
    @ResponseBody
    public int searchWayBillTotal(@RequestBody WayBill wayBill) {
        try {
            return wayBillService.searchCount(wayBill);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param wayBill
     * @return
     */
    @RequestMapping("searchWayBill")
    @ResponseBody
    public String searchSampleInfo(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            List<WayBill> wayBillList = wayBillService.search(wayBill);
            JSONArray data = JSONArray.fromArray(wayBillList.toArray(new WayBill[wayBillList.size()]));
            System.out.println(data);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 审核通过
     * @param wayBill
     * @return
     */
    @RequestMapping("approvalWayBill")
    @ResponseBody
    public String approvalWayBill(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.approval(wayBill);
            res.put("status", "success");
            res.put("message", "审核通过成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核通过失败！");
        }
        return res.toString();
    }

    /**
     * 驳回
     * @param wayBill
     * @return
     */
    @RequestMapping("rejectWayBill")
    @ResponseBody
    public String rejectWayBill(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.reject(wayBill);
            res.put("status", "success");
            res.put("message", "审核驳回成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核驳回失败！");
        }
        return res.toString();
    }

    /**
     * 提交
     * @param id
     * @return
     */
    @RequestMapping("submitWayBill")
    @ResponseBody
    public String submitWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.submit(id);
            res.put("status", "success");
            res.put("message", "提交成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败！");
        }
        return res.toString();
    }

    /**
     * 作废
     * @param id
     * @return
     */
    @RequestMapping("invalidWayBill")
    @ResponseBody
    public String invalidWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败！");
        }
        return res.toString();
    }
/////////////////////////////////////////////////////////////////////////
    //WayBill.html

    /**
     * 添加接运单详细项目
     * @param wayBill
     * @return
     */
    @RequestMapping("addWayBillItem")
    @ResponseBody
    public String addWayBillItem(@RequestBody WayBill wayBill){
        JSONObject res = new JSONObject();
        try{
            wayBillService.addItem(wayBill);
            res.put("status","success");
            res.put("message","添加接运单详细项目成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","添加接运单详细项目失败！");
        }
        return res.toString();
    }

    @RequestMapping("getCurrentItemId")
    @ResponseBody
    public String getCurrentItemId() {
        JSONObject res = new JSONObject();
        int count = wayBillService.countItem() + 1;
        String id = Integer.toString(count);
        while (wayBillService.getItemById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        res.put("id",id);
        return res.toString();
    }

    @RequestMapping("getSalesmanIdByName")
    @ResponseBody
    public String getSalesmanByName(String name){
        JSONObject res = new JSONObject();
        String id = wayBillService.getSalesmanIdByName(name);
        res.put("id",id);
        return res.toString();
    }

    @RequestMapping("getClientIdByName")
    @ResponseBody
    public String getClientIdByName(String name){
        JSONObject res = new JSONObject();
        String id = wayBillService.getClientIdByName(name);
        res.put("id",id);
        return res.toString();
    }

    @RequestMapping("getWastesIdByName")
    @ResponseBody
    public String getWastesIdByName(String name){
        JSONObject res = new JSONObject();
        String id = wayBillService.getWastesIdByName(name);
        res.put("id",id);
        return res.toString();
    }

    @RequestMapping("getCurrentItemWastesId")
    @ResponseBody
    public String getCurrentWastesId(){
        JSONObject res = new JSONObject();
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String id ;
        int index = wayBillService.countWastes();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (wayBillService.getWastesById(id) != null);
        res.put("id",id);
        return res.toString();
    }

    @RequestMapping("changeWastesIdFormat")
    @ResponseBody
    public String changeWastesIdFormat(int id){
        JSONObject res = new JSONObject();
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String r = nf.format(id);
        res.put("id",r);
        return res.toString();
    }

}
