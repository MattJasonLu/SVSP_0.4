package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.EquipmentService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * 设备控制器，用于捕获url路径并进行操作返回数据
 */
@Controller
public class EquipmentController {

    /**
     * 设备服务，用于CRUD(Create、Retrieve、Update、Delete)
     */
    @Autowired
    EquipmentService equipmentService;

    /**
     * 新增设备
     */
    @RequestMapping("addEquipment")
    @ResponseBody
    public String addEquipment(@RequestBody EquipmentDate equipmentDate) {
        JSONObject res = new JSONObject();
        try {
            equipmentService.addEquipment(equipmentDate);
            res.put("status", "success");
            res.put("message", "添加父表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加父表失败");
        }
        return res.toString();
    }
    /**
     * 新增设备明细
     */
    @RequestMapping("addEquipmentItem")
    @ResponseBody
    public String addEquipment(@RequestBody EquipmentItem equipmentItem) {
        JSONObject res = new JSONObject();
        try {
            String documentNumber= equipmentService.getNewestId().get(0);
            equipmentItem.setDocumentNumber(documentNumber);
            equipmentService.addEquipmentItem(equipmentItem);
            res.put("status", "success");
            res.put("message", "添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加子表失败");
        }
        return res.toString();
    }
    /**
     * 通过日期查询设备明细集合
     *
     * @param documentNumber 单据号
     * @return 设备明细集合
     */
    @RequestMapping("getEquipment")
    @ResponseBody
    public String getEquipment(String documentNumber) {
        // 新建一个用于存放数据的结果集
        JSONObject res = new JSONObject();
        try {
            // 通过日期查询到数据列表
            List<EquipmentDate> equipmentList = equipmentService.getEquipment(documentNumber);
            // 获取数据：将数据列表转换成json数组(把list列表转换成json数组的通用写法)
            JSONArray data = JSONArray.fromArray(equipmentList.toArray());
            // 存放数据
            res.put("status", "success");
            res.put("message", "获取信息条目成功");
            res.put("data", data);
            // 返回结果集
            return res.toString();
        } catch (Exception e) {
            // 获取枚举
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息条目失败");
            // 返回结果
            return res.toString();
        }
    }

    /**
     * 列出所有设备按日期
     *
     * @return 设备列表
     */
    @RequestMapping("listEquipment")
    @ResponseBody
    public String listEquipment() {
        JSONObject res = new JSONObject();
        try {
            // 获取设备列表
            List<EquipmentDate> equipmentList = equipmentService.listEquipment();
            JSONArray data = JSONArray.fromArray(equipmentList.toArray());
            res.put("status", "success");
            res.put("message", "操作成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    @RequestMapping("equipmentListPage")
    @ResponseBody
    public String equipmentListPage(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<EquipmentDate> equipmentDateList = equipmentService.equipmentListPage(page);
            JSONArray data = JSONArray.fromArray(equipmentDateList.toArray(new EquipmentDate[equipmentDateList.size()]));
            res.put("data", data);
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
    /**
     *
     * 生成单据号
     */
    @RequestMapping("createDocNumber")
    @ResponseBody
    public String createDocNumber() {
        JSONObject res = new JSONObject();
        String DocNumberId = "0001";
        try {
            if (equipmentService.getNewestId().size()>0) {
                String DocNumber = equipmentService.getNewestId().get(0);
                DocNumberId =get4(DocNumber);
            }
            if (equipmentService.getNewestId().size()==0) {
                DocNumberId = "0001";
            }
            res.put("DocNumberId",DocNumberId);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 获得四位数
     */
    public String get4(String DocNumber) {
        String s = String.valueOf((Integer.parseInt(DocNumber) + 1));
        // update 2018年11月13日 by Matt：s.length() != 4 -> s.length() < 4
        while (s.length() < 4) {
            s = "0" + s;
        }
        return s;
    }

    /**
     * 高级查询
     */
    @RequestMapping("searchEquipment")
    @ResponseBody
    public String searchEquipment(@RequestBody EquipmentDate equipmentDate){
        //System.out.println(Equipment.getKeyword()+"YH");
        JSONObject res = new JSONObject();
        try {
            List<EquipmentDate> equipmentList = equipmentService.search(equipmentDate);
           // JSONArray data = JSONArray.fromArray(equipmentList.toArray(new EquipmentDate[equipmentList.size()]));
            res.put("length",equipmentList.size());
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", equipmentList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return  res.toString();
    }

    /**
     * 获取总记录数
     * @return 总记录数
     */
    @RequestMapping("totalEquipmentRecord")
    @ResponseBody
    public int totalEquipmentRecord(){
        try {
            return equipmentService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取查询记录数
     * @return 查询记录数
     */
    @RequestMapping("searchEquipmentTotal")
    @ResponseBody
    public int searchEquipmentTotal(@RequestBody Equipment equipment){
        try {
            return equipmentService.searchCount(equipment);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 删除设备(通用)
     */
    @RequestMapping("deleteEquipment")
    @ResponseBody
    public String deleteEquipmentDate(String documentNumber) {
        JSONObject res = new JSONObject();
        try {
            // 删除设备
            equipmentService.deleteEquipment(documentNumber);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importEquipmentExcel")
    @ResponseBody
    public String importEquipmentExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            {
                System.out.println("数据如下：");
                for (int i = 0; i < data.length; i++) {
                    for (int j = 0; j < data[1].length; j++) {
                        System.out.print(data[i][j].toString());
                        System.out.print(",");
                    }
                    System.out.println();
                }
            }
            Map<String, EquipmentDate> map = new HashMap<>();
            List<EquipmentItem> equipmentItemArrayList = new ArrayList<>();
            String id1 = "";
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();
                EquipmentItem equipmentItem = new EquipmentItem();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new EquipmentDate());
                    map.get(id).setDocumentNumber(id);
                    map.get(id).setDayTime(DateUtil.getDateFromStr(data[i][4].toString()));
                   // map.get(id).setEditTime(DateUtil.getDateFromStr(data[i][4].toString()));
                    map.get(id).setCreator(data[i][5].toString());
                    map.get(id).setCreateDept(data[i][6].toString());
                    map.get(id).setNote(data[i][7].toString());
                    //新存储一个id对象时，将以下两个累计数据清零
                    equipmentItemArrayList = new ArrayList<>();
                }
                switch (data[i][1].toString()) {
                    case "医疗蒸煮系统":
                        equipmentItem.setEquipment(Equipment.MedicalCookingSystem);
                        break;
                    case "A2":
                        equipmentItem.setEquipment(Equipment.A2);
                        break;
                    case "B2":
                        equipmentItem.setEquipment(Equipment.B2);
                        break;
                    case "二期二燃室":
                        equipmentItem.setEquipment(Equipment.SecondaryTwoCombustionChamber);
                        break;
                    case "三期预处理系统":
                        equipmentItem.setEquipment(Equipment.ThirdPhasePretreatmentSystem);
                        break;
                    case "备2":
                        equipmentItem.setEquipment(Equipment.Prepare2);
                        break;
                    default: break;
                }
                equipmentItem.setRunningTime(Float.parseFloat(data[i][2].toString()));
                equipmentItem.setStopTime(24 - Float.parseFloat(data[i][2].toString()));
                equipmentItem.setStopResult(data[i][3].toString());
                equipmentItem.setDocumentNumber(id);
                equipmentItemArrayList.add(equipmentItem);
                map.get(id).setEquipmentItemList(equipmentItemArrayList);
            }
            for (String key : map.keySet()) {
                EquipmentDate equipmentDate1 = equipmentService.getEquipmentDateByDocumentNumber(map.get(key).getDocumentNumber());
                EquipmentDate equipmentDate = map.get(key);
                if (equipmentDate1 == null) {
                    //插入新数据
                    equipmentService.addEquipment(equipmentDate);
                    for (EquipmentItem equipmentItem : equipmentDate.getEquipmentItemList())
                        equipmentService.addEquipmentItem(equipmentItem);
                } else {
                    res.put("status", "fail");
                    res.put("message", "编号重复，请检查后导入");
                    return res.toString();
                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }
}