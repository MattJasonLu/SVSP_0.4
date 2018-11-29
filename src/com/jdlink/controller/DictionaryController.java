package com.jdlink.controller;

import com.jdlink.domain.Dictionary.DataDictionary;
import com.jdlink.domain.Dictionary.DataDictionaryItem;
import com.jdlink.domain.Dictionary.SecondaryCategory;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.service.OutboundOrderService;
import com.jdlink.service.dictionary.DictionaryService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Dictionary;
import java.util.List;

@Controller
public class DictionaryController {

    @Autowired
    DictionaryService dictionaryService;
    @Autowired
    OutboundOrderService outboundOrderService;

    //获取主表总数
    @RequestMapping("getIdCount")
    @ResponseBody
    public String getIdCount() {
        JSONObject res = new JSONObject();
        try {
            int count = dictionaryService.getIdCount() + 1;
            res.put("status", "success");
            res.put("message", "总数查询成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "总数查询失败");
        }

        return res.toString();
    }

    //数据字典主表新建
    @RequestMapping("addDataDictionary")
    @ResponseBody
    public String addDataDictionary(@RequestBody DataDictionary dataDictionary) {
        JSONObject res = new JSONObject();
        try {
            dictionaryService.addDataDictionary(dataDictionary);
            res.put("status", "success");
            res.put("message", "新建成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新建失败");
        }

        return res.toString();

    }

    //数据字典子表新建
    @RequestMapping("addDataDictionaryItem")
    @ResponseBody
    public String addDataDictionaryItem(@RequestBody DataDictionaryItem dataDictionaryItem) {
        JSONObject res = new JSONObject();

        try {
            //寻找最新的id
            int datadictionaryId = dictionaryService.getNewestId();
            dataDictionaryItem.setDataDictionaryId(datadictionaryId);
            dictionaryService.addDataDictionaryItem(dataDictionaryItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");
        }
        return res.toString();
    }


    //加载页面数据
    @RequestMapping("getDictionariesDataList")
    @ResponseBody
    public String getDictionariesDataList(@RequestBody Page page) {
        JSONObject res = new JSONObject();

        try {
            List<DataDictionary> dataDictionaryList = dictionaryService.getDictionariesDataList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", dataDictionaryList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }

    //获取表的总数
    @RequestMapping("totalDataDictionaryCount")
    @ResponseBody
    public int DataDictionary() {

        return dictionaryService.getIdCount();
    }

    //根据主键获取字典信息
    @RequestMapping("getDataDictionaryById")
    @ResponseBody
    public String getDataDictionaryById(String dataDictionaryId) {
        JSONObject res = new JSONObject();
        try {
            DataDictionary dataDictionary = dictionaryService.getDataDictionaryById(dataDictionaryId);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", dataDictionary);

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");

        }
        return res.toString();
    }

    //修改主表
    @RequestMapping("updateDataDictionary")
    @ResponseBody
    public String updateDataDictionary(@RequestBody DataDictionary dataDictionary) {
        JSONObject res = new JSONObject();


        try {
            dictionaryService.updateDataDictionary(dataDictionary);
            dictionaryService.deleteDataDictionaryById(dataDictionary.getDataDictionaryId());
            res.put("status", "success");
            res.put("message", "主表修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表修改失败");
        }
        return res.toString();
    }

    //修改字表
    @RequestMapping("updateDataDictionaryItem")
    @ResponseBody
    public String updateDataDictionaryItem(@RequestBody DataDictionaryItem dataDictionaryItem) {
        JSONObject res = new JSONObject();

        try {
            dictionaryService.addDataDictionaryItem(dataDictionaryItem);
            res.put("status", "success");
            res.put("message", "字表修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表修改失败");
        }

        return res.toString();
    }

    //数据字典查询
    @RequestMapping("searchDictionary")
    @ResponseBody
    public String searchDictionary(@RequestBody DataDictionary dataDictionary) {
        JSONObject res = new JSONObject();

        try {
            List<DataDictionary> dataDictionaryList = dictionaryService.searchDictionary(dataDictionary);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", dataDictionaryList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    //数据字典查询计数
    @RequestMapping("searchDictionaryCount")
    @ResponseBody
    public int searchDictionaryCount(@RequestBody DataDictionary dataDictionary) {

        return dictionaryService.searchDictionaryCount(dataDictionary);
    }


    /*
    获取物质形态字典数据
    * */
    @RequestMapping("getFormTypeByDataDictionary")
    @ResponseBody
    public String getFormTypeByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(1);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取物质形态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取物质形态失败");

        }
        return res.toString();
    }

    /*
  获取出库类别字典数据
  * */
    @RequestMapping("getBoundTypeByDataDictionary")
    @ResponseBody
    public String getBoundTypeByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(2);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取出库类别成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取出库类别失败");

        }
        return res.toString();
    }

    /*
获取币种字典数据
* */
    @RequestMapping("getCurrencyByDataDictionary")
    @ResponseBody
    public String getCurrencyByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(3);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取币种成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取币种失败");

        }
        return res.toString();
    }


    /*
  获取记录状态字典数据
  * */
    @RequestMapping("getRecordStateByDataDictionary")
    @ResponseBody
    public String getRecordStateByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(4);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取记录状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取记录状态失败");

        }
        return res.toString();
    }


    /*
获取处置设备字典数据
* */
    @RequestMapping("getEquipmentByDataDictionary")
    @ResponseBody
    public String getEquipmentByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(5);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取处置设备成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取处置设备失败");

        }
        return res.toString();
    }

    /*
获取进料方式字典数据
* */
    @RequestMapping("getHandleCategoryByDataDictionary")
    @ResponseBody
    public String getHandleCategoryByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(6);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取进料方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取进料方式失败");

        }
        return res.toString();
    }

    /*
获取辅料/备件入库领用出库状态字典数据
* */
    @RequestMapping("getIngredientStateByDataDictionary")
    @ResponseBody
    public String getIngredientStateByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(6);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取辅料/备件入库领用出库状态方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取辅料/备件入库领用出库状态方式失败");

        }
        return res.toString();
    }

    /*
   获取处置方式字典数据
    */
    @RequestMapping("getProcessWayByDataDictionary")
    @ResponseBody
    public String getProcessWayByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(8);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取处置方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取处置方式失败");

        }
        return res.toString();
    }

    /*
获取申报状态字典数据
*/
    @RequestMapping("getApplicationStatusByDataDictionary")
    @ResponseBody
    public String getApplicationStatusByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(9);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取申报状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取申报状态失败");

        }
        return res.toString();
    }

    /*
获取样品预约单状态字典数据
*/
    @RequestMapping("getApplyStateDataByDictionary")
    @ResponseBody
    public String getApplyStateDataByDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(10);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取样品预约单状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取样品预约单状态失败");

        }
        return res.toString();
    }


    /*
获取审核状态字典数据
*/
    @RequestMapping("getCheckStateDataByDictionary")
    @ResponseBody
    public String getCheckStateDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(11);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取审核状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取审核状态失败");

        }
        return res.toString();
    }


    /*
获取客户状态字典数据
*/
    @RequestMapping("getClientStateByDataDictionary")
    @ResponseBody
    public String getClientStateDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(12);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取客户状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取客户状态失败");

        }
        return res.toString();
    }

    /*
  获取客户类型字典数据
   */
    @RequestMapping("getClientTypeDataByDictionary")
    @ResponseBody
    public String getClientTypeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(13);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取客户类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取客户类型失败");

        }
        return res.toString();
    }


    /*
         获取合同类型字典数据
          */
    @RequestMapping("getContractTypeDataByDictionary")
    @ResponseBody
    public String getContractTypeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(14);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取合同类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取合同类型失败");

        }
        return res.toString();
    }


    /*
          获取合同版本字典数据
           */
    @RequestMapping("getContractVersionByDataDictionary")
    @ResponseBody
    public String getContractVersionDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(15);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取合同版本成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取合同版本失败");

        }
        return res.toString();
    }


    /*
          获取文档类型字典数据
           */
    @RequestMapping("getDocumentTypeByDataDictionary")
    @ResponseBody
    public String getDocumentTypeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(16);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取文档类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取文档类型失败");

        }
        return res.toString();
    }


    /*
         获取企业类型字典数据
          */
    @RequestMapping("getEnterpriseTypeByDataDictionary")
    @ResponseBody
    public String getEnterpriseTypeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(17);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取企业类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取企业类型失败");

        }
        return res.toString();
    }



    /*
            获取经营方式字典数据
             */
    @RequestMapping("getOperationModeByDataDictionary")
    @ResponseBody
    public String getOperationModeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(18);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取经营方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取经营方式失败");

        }
        return res.toString();
    }


    /*
           获取操作记录字典数据
            */
    @RequestMapping("getOperationRecordByDataDictionary")
    @ResponseBody
    public String getOperationRecordDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(19);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取操作记录成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取操作记录失败");

        }
        return res.toString();
    }



    /*
         获取经营单位类别字典数据
          */
    @RequestMapping("getOperationTypeByDataDictionary")
    @ResponseBody
    public String getOperationTypeDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(20);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取操作类别成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取操作类别失败");

        }
        return res.toString();
    }


    /*
            获取包装方式字典数据
             */
    @RequestMapping("getPackageTypeByDataDictionary")
    @ResponseBody
    public String getPackageTypeByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(21);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取包装方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取包装方式失败");

        }
        return res.toString();
    }


    /*
           获取供应商类型字典数据
            */
    @RequestMapping("getSupplierTypeByDataDictionary")
    @ResponseBody
    public String getSupplierTypeByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(22);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取供应商类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取供应商类型失败");

        }
        return res.toString();
    }


    /*
         获取开票类型字典数据
          */
    @RequestMapping("getTicketRate1ByDataDictionary")
    @ResponseBody
    public String getTicketRate1ByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(23);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取开票类型成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取开票类型失败");

        }
        return res.toString();
    }


    /*
        获取运输方式字典数据
         */
    @RequestMapping("getTransportTypeByDataDictionary")
    @ResponseBody
    public String getTransportTypeByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(24);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取运输方式成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取运输方式失败");

        }
        return res.toString();
    }


    /*
          获取计量单位字典数据
           */
    @RequestMapping("getUnitByDataDictionary")
    @ResponseBody
    public String getUnitByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(25);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取计量单位成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取计量单位失败");

        }
        return res.toString();
    }


    /*
         获取次生类别字典数据
          */
    @RequestMapping("getSecondaryCategoryByDataDictionary")
    @ResponseBody
    public String getSecondaryCategoryByDataDictionary() {
        JSONObject res = new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(26);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取次生类别成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取次生类别失败");

        }
        return res.toString();
    }

     /*
         获取事故防范和应急预案字典数据
          */
     @RequestMapping("getContingencyPlanByDataDictionary")
     @ResponseBody
     public String getContingencyPlanByDataDictionary() {
         JSONObject res = new JSONObject();
         try {
             List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(27);
             JSONArray data = JSONArray.fromArray(formTypeList.toArray());
             res.put("data", data);
             res.put("status", "success");
             res.put("message", "获取事故防范和应急预案成功");
         } catch (Exception e) {
             e.printStackTrace();
             res.put("status", "fail");
             res.put("message", "获取事故防范和应急预案失败");

         }
         return res.toString();
     }


        /**
          * 根据明细名称获取编号
          */
        public int getdatadictionaryitemIdByName(String name,int id){
            return dictionaryService.getdatadictionaryitemIdByName(name,id);
        }


}
