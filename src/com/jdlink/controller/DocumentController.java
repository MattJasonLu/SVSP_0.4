package com.jdlink.controller;

import com.jdlink.domain.Document;
import com.jdlink.domain.DocumentType;
import com.jdlink.service.DocumentService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
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

    @RequestMapping("saveDocument")
    @ResponseBody
    public String saveDocument(@RequestBody Document document) {
        JSONObject res = new JSONObject();
        documentService.add(document);
        String fileId = documentService.count() + "";
        try {
            res.put("status", "success");
            res.put("message", "保存文件成功");
            res.put("fileId", fileId);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "保存文件失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 保存新建文档中的附件
     * @param fileId
     * @param attachment
     * @return
     */
    @RequestMapping("saveDocumentFile")
    @ResponseBody
    public String saveDocumentFile(String fileId, MultipartFile attachment) {
        JSONObject res = new JSONObject();
        try {
            Document document = documentService.getFileById(fileId);

            String documentType = String.valueOf(document.getDocumentType());
            // 若文件夹不存在则创建文件夹
            String dirPathStr = "Files/" + documentType;
            File dirPath = new File(dirPathStr);
            if (!dirPath.exists()) {
                dirPath.mkdirs();
            }
//            // 获取文件名字
            String fileName = document.getClientId() + "-" +  attachment.getOriginalFilename();
            String filePath = dirPathStr + "/" + fileName;
            File file = new File(filePath);
            attachment.transferTo(file);
            document.setFilePath(filePath);
            documentService.updateFilePath(document);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res.toString();
    }

    @RequestMapping("getDocumentTypeList")
    @ResponseBody
    public String getDocumentTypeList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray array1 = JSONArray.fromArray(DocumentType.values());
        res.put("documentTypeStrList", array1);
        return res.toString();
    }
}
