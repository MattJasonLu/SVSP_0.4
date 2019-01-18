
/*应急暂存控制器*/
package com.jdlink.controller;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.service.produce.EmergencyMaterialService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Controller
public class EmergencyMaterialController {
    @Autowired
    EmergencyMaterialService emergencyMaterialService;

    /*应急暂存新增*/
     @RequestMapping("addEmergencyMaterial")
    @ResponseBody
    public String addEmergencyMaterial(@RequestBody EmergencyMaterial emergencyMaterial){
         JSONObject res=new JSONObject();

          try {
              emergencyMaterialService.addEmergencyMaterial(emergencyMaterial);
              res.put("status", "success");
              res.put("message", "添加成功");

          }
          catch (Exception e){
              e.printStackTrace();
              res.put("status", "fail");
              res.put("message", "添加失败");

          }

          return res.toString();
     }

     /*应急暂存页面加载*/
    @RequestMapping("loadEmergencyTSList")
    @ResponseBody
    public String loadEmergencyTSList(@RequestBody Page page){
        JSONObject res=new JSONObject();
           try {
               List<EmergencyMaterial> emergencyMaterialList=emergencyMaterialService.loadEmergencyTSList(page);
               res.put("message", "分页数据获取成功");
               res.put("data", emergencyMaterialList);
           }
           catch (Exception e){
               e.printStackTrace();
               res.put("status", "fail");
               res.put("message", "分页数据获取失败");

           }
           return res.toString();
    }

    /*根据单号获取应急暂存*/
    @RequestMapping("getEmergencyTSById")
    @ResponseBody
    public String getEmergencyTSById(String planId){
        JSONObject res=new JSONObject();

         try {
             EmergencyMaterial emergencyMaterial=emergencyMaterialService.getEmergencyTSById(planId);
             res.put("status", "success");
             res.put("message", "更新成功");
             res.put("data", emergencyMaterial);
         }
         catch (Exception e){
             e.printStackTrace();
             res.put("status", "fail");
             res.put("message", "更新失败");
         }
       return res.toString();
    }

    /*更新应急暂存*/
    @RequestMapping("updateEmergencyTS")
    @ResponseBody
    public String updateEmergencyTS(@RequestBody EmergencyMaterial emergencyMaterial){

        JSONObject res=new JSONObject();

        try {
            emergencyMaterialService.updateEmergencyTS(emergencyMaterial);
            res.put("status", "success");
            res.put("message", "信息完善成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "信息完善失败");
        }

        return res.toString();
    }

    //保存应急暂存合同附件
    @RequestMapping("saveEmergencyMaterialFile")
    @ResponseBody
    public String saveEmergencyMaterialFile(MultipartFile multipartFile, String planId){
        JSONObject res = new JSONObject();

        try {

            EmergencyMaterial emergencyMaterial = new EmergencyMaterial();
            emergencyMaterial.setPlanId(planId);
            if (multipartFile != null) {
                String materialPath = "Files/EmergencyMaterial"; //设置服务器路径
                File materialDir = new File(materialPath);
                if (!materialDir.exists()) {
                    materialDir.mkdirs();
                }


                String materialName = planId + "-" +  multipartFile.getOriginalFilename();//设置文件名称
                String materialFilePath = materialPath + "/" + materialName;//下载路径
                File materialFile = new File(materialFilePath);
                multipartFile.transferTo(materialFile);
                emergencyMaterial.setFileUrl(materialFilePath);
            }
            emergencyMaterialService.setEmergencyMaterialFilePath(emergencyMaterial);

            res.put("status", "success");
            res.put("message", "文件上传成功");

        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "文件上传失败");

        }


        return res.toString();
    }

    /*获取应急暂存总数*/
    @RequestMapping("loadEmergencyMaterialCount")
    @ResponseBody
    public int loadEmergencyMaterialCount(){

        return emergencyMaterialService.loadEmergencyMaterialCount();
    }

    /*查询*/
    @RequestMapping("searchEmergencyMaterial")
    @ResponseBody
    public String searchEmergencyMaterial(@RequestBody EmergencyMaterial emergencyMaterial){
        JSONObject res=new JSONObject();

        try {
       List<EmergencyMaterial> emergencyMaterialList=emergencyMaterialService.searchEmergencyMaterial(emergencyMaterial);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", emergencyMaterialList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
          return res.toString();
    }

    /*查询计数*/
    @RequestMapping("searchEmergencyMaterialCount")
    @ResponseBody
    public int searchEmergencyMaterialCount(@RequestBody EmergencyMaterial emergencyMaterial){
        return emergencyMaterialService.searchEmergencyMaterialCount(emergencyMaterial);

    }

    /*审批应急暂存*/
    @RequestMapping("approvalEmergencyMaterial")
    @ResponseBody
    public String approvalEmergencyMaterial(String planId){
        JSONObject res=new JSONObject();

        try {
            emergencyMaterialService.approvalEmergencyMaterial(planId);
            res.put("status", "success");
            res.put("message", "审批通过，已入库");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审批失败");
        }



        return res.toString();
    }
}
