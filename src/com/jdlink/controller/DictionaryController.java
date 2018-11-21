package com.jdlink.controller;

import com.jdlink.domain.Dictionary.DataDictionary;
import com.jdlink.domain.Dictionary.DataDictionaryItem;
import com.jdlink.domain.Page;
import com.jdlink.service.dictionary.DictionaryService;
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
    public String addDataDictionaryItem(@RequestBody DataDictionaryItem dataDictionaryItem){
        JSONObject res=new JSONObject();

        try {
            //寻找最新的id
            int datadictionaryId=dictionaryService.getNewestId();
            dataDictionaryItem.setDataDictionaryId(datadictionaryId);
            dictionaryService.addDataDictionaryItem(dataDictionaryItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");
        }
        return res.toString();
    }


    //加载页面数据
    @RequestMapping("getDictionariesDataList")
    @ResponseBody
    public String getDictionariesDataList(@RequestBody Page page){
        JSONObject res=new JSONObject();

        try {
            List<DataDictionary> dataDictionaryList=dictionaryService.getDictionariesDataList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", dataDictionaryList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }

    //获取表的总数
    @RequestMapping("totalDataDictionaryCount")
    @ResponseBody
    public int DataDictionary(){

        return dictionaryService.getIdCount();
    }

    //根据主键获取字典信息
    @RequestMapping("getDataDictionaryById")
    @ResponseBody
    public String getDataDictionaryById(String dataDictionaryId){
        JSONObject res=new JSONObject();
        try {
            DataDictionary dataDictionary=dictionaryService.getDataDictionaryById(dataDictionaryId);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", dataDictionary);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");

        }
        return res.toString();
    }

    //修改主表
    @RequestMapping("updateDataDictionary")
    @ResponseBody
    public String updateDataDictionary(@RequestBody DataDictionary dataDictionary){
        JSONObject res=new JSONObject();


        try {
          dictionaryService.updateDataDictionary(dataDictionary);
          dictionaryService.deleteDataDictionaryById(dataDictionary.getDataDictionaryId());
            res.put("status", "success");
            res.put("message", "主表修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表修改失败");
        }
        return res.toString();
    }

    //修改字表
    @RequestMapping("updateDataDictionaryItem")
    @ResponseBody
    public String updateDataDictionaryItem(@RequestBody DataDictionaryItem dataDictionaryItem){
        JSONObject res=new JSONObject();

        try {
            dictionaryService.addDataDictionaryItem(dataDictionaryItem);
            res.put("status", "success");
            res.put("message", "字表修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表修改失败");
        }

        return res.toString();
    }
}
