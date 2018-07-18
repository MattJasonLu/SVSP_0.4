package com.jdlink.controller;

import com.jdlink.util.DBUtil;

import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class UtilController {

    @RequestMapping("exportExcel")
    @ResponseBody
    public String exportExcel(String name,HttpServletResponse response) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            db.exportExcel(name,response);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }

    @RequestMapping("importExcel")
    @ResponseBody
    public String importExcel(MultipartFile excelFile,String tableName){
        JSONObject res = new JSONObject();
        try {
            DBUtil db=new DBUtil();
            db.importExcel(excelFile, tableName);
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


