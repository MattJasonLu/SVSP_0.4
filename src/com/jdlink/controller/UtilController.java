package com.jdlink.controller;

import com.jdlink.util.DBUtil;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.*;

@Controller
public class UtilController {

    /**
     * 导出
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcel")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            db.exportExcel(name, response, sqlWords);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
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
    @RequestMapping("importExcel")
    @ResponseBody
    public String importExcel(MultipartFile excelFile, String tableName, String id) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            db.importExcel(excelFile, tableName, id);
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！" + e.getMessage());
        }
        return res.toString();

    }

    /**
     * 下载模板
     *
     * @param filePath
     * @param response
     */
    @RequestMapping("downloadFile")
    @ResponseBody
    public void downloadFile(String filePath, HttpServletResponse response) {
        String fileName = "";
        try {
            filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
            String[] str = filePath.split("[/]");
            fileName = java.net.URLEncoder.encode(str[str.length - 1], "UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.setContentType("multipart/form-data");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            InputStream in = null;
            in = new FileInputStream(filePath);
            byte[] buffer = new byte[1024];
            int bytesRead = 0;
            do {
                bytesRead = in.read(buffer, 0, buffer.length);
                response.getOutputStream().write(buffer, 0, bytesRead);
            } while (bytesRead == buffer.length);
            in.close();
            response.getOutputStream().flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}




