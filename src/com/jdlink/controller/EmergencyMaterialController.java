
/*应急暂存控制器*/
package com.jdlink.controller;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;
import com.jdlink.service.produce.EmergencyMaterialService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
