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
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcel2")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords,String tableHead) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            byte[] bytes = tableHead.getBytes("UTF-8");
            String tHead = new String(bytes,"UTF-8");
            System.out.println(tHead);
            db.exportExcel2(name, response, sqlWords,tHead);//HttpServletResponse response
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
     * @param filePath 文件路径
     * @param response
     */
    @RequestMapping("downloadFile")
    @ResponseBody
    public void downloadFile(String filePath, HttpServletResponse response) {
        String fileName = "";   // 初始化文件名
        try {
            // 获取文件路径，适配中文
            filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
            String[] str = filePath.split("[/]");     // 根据“/”将字符串分割成数组
            fileName = java.net.URLEncoder.encode(str[str.length - 1], "UTF-8");  // 设置文件名
            response.setCharacterEncoding("UTF-8");   // 设置编码
            response.setContentType("multipart/form-data");
            // 设置头文件
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            // 初始化输入流
            InputStream in = null;
            in = new FileInputStream(filePath);
            byte[] buffer = new byte[1024];
            int bytesRead = 0;
            do {
                // 写入字节
                bytesRead = in.read(buffer, 0, buffer.length);
                response.getOutputStream().write(buffer, 0, bytesRead);
            } while (bytesRead == buffer.length);
            in.close();      // 关闭输入流等
            response.getOutputStream().flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}




