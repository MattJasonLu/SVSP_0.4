package com.jdlink.controller;

import com.jdlink.service.CompatibilityService;
import com.jdlink.util.DBUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.NumberFormat;

@Controller
public class CompatibilityController {
    @Autowired
    CompatibilityService compatibilityService;
    @RequestMapping("getCurrentCompatibilityId")
    @ResponseBody
    public  String getCurrentCompatibilityId(){
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = compatibilityService.total();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (compatibilityService.getByCompatibilityId(id) != null);
        JSONObject res = new JSONObject();
        res.put("compatibilityId", id);
        System.out.println(id+"AAA");
        return res.toString();
    }

    @RequestMapping("importCompatibilityExcel")
    @ResponseBody
    public String importCompatibilityExcel(MultipartFile excelFile, String tableName, String id){
        JSONObject res = new JSONObject();
        try {
            DBUtil db=new DBUtil();
            db.importExcel(excelFile, tableName,id);
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！"+e.getMessage());
        }
        return res.toString();

    }



}
