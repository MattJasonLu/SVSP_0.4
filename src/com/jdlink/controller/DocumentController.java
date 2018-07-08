package com.jdlink.controller;

import com.jdlink.domain.Document;
import com.jdlink.service.DocumentService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
@Controller
public class DocumentController {
    @Autowired
    DocumentService documentService;

    @RequestMapping("listDocumentByClientId")
    @ResponseBody
    public String listDocumentByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取客户文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取客户文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listContractByClientId")
    @ResponseBody
    public String listContractByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listContractByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取合同文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取合同文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listManagePlanByClientId")
    @ResponseBody
    public String listManagePlanByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listManagePlanByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取管理计划文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取管理计划文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listEIAByClientId")
    @ResponseBody
    public String listEIAByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listEIAByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取环评文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取环评文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listBusinessLicenseByClientId")
    @ResponseBody
    public String listBusinessLicenseByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listBusinessLicenseByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取营业执照文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取营业执照文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listInstructionByClientId")
    @ResponseBody
    public String listInstructionByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listInstructionByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取说明文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取说明文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listInvoiceInfoByClientId")
    @ResponseBody
    public String listInvoiceInfoByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listInvoiceInfoByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取开票资料文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取开票资料文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("listMSDSByClientId")
    @ResponseBody
    public String listMSDSByClientId(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Document> documentList = documentService.listMSDSByClientId(clientId);
            JSONArray data = JSONArray.fromArray(documentList.toArray(new Document[documentList.size()]));
            res.put("status", "success");
            res.put("message", "获取化学物质文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取化学物质文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("getFileById")
    @ResponseBody
    public String getFileById(String fileId) {
        JSONObject res = new JSONObject();
        Document document = documentService.getFileById(fileId);
        JSONObject data = JSONObject.fromBean(document);
        try {
            res.put("status", "success");
            res.put("message", "获取化学物质文件列表成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取化学物质文件列表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("downloadFileById")
    @ResponseBody
    public void downloadFileById(String fileId, HttpServletResponse response) {
        Document document = documentService.getFileById(fileId);
        String filePath = document.getFilePath();
        String fileName = "file";
        try {
            filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
            String[] str = filePath.split("[/]");
            fileName = java.net.URLEncoder.encode(str[str.length-1], "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setCharacterEncoding("UTF-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        InputStream in = null;
        try {
            in = new FileInputStream(filePath);
            byte[] buffer = new byte[1024];
            int bytesRead = 0;
            do {
                bytesRead = in.read(buffer, 0, buffer.length);
                response.getOutputStream().write(buffer, 0, bytesRead);
            } while (bytesRead == buffer.length);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
                response.getOutputStream().flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("saveFile")
    @ResponseBody
    public String saveFile(@RequestBody Document document) {
        JSONObject res = new JSONObject();
        documentService.add(document);
        try {
            res.put("status", "success");
            res.put("message", "保存文件成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "保存文件失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}
