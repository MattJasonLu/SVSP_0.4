package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.domain.Wastes;
import com.jdlink.service.IngredientsService;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PRIngredientsController {

    @Autowired
    IngredientsService ingredientsService;

    ///////////辅料/备件入库单////////////////
    /**
     * 获取当前焚烧单编号
     *
     * @return
     */
    @RequestMapping("getCurrentIngredientsInId")
    @ResponseBody
    public String getCurrentIngredientsInId() {
        // 生成焚烧工单号 yyyyMM00000
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
        String prefix = simpleDateFormat.format(date);
        int count = ingredientsService.countInById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0000" + count;
        else if (count > 9 && count <= 99) suffix = "000" + count;
        else if (count > 99 && count <= 999) suffix = "00" + count;
        else if (count > 999 && count <= 9999) suffix = "0" + count;
        else suffix = "" + count;
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (ingredientsService.getInById(id) != null) {
            int index = Integer.parseInt(suffix);
            index += 1;
            if (index <= 9) suffix = "0000" + index;
            else if (index > 9 && index <= 99) suffix = "000" + index;
            else if (index > 99 && index <= 999) suffix = "00" + index;
            else if (index > 999 && index <= 9999) suffix = "0" + index;
            else suffix = "" + index;
            id = RandomUtil.getAppointId(prefix, suffix);
            System.out.println(id);
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 根据Id获取对象数据
     *
     * @param id
     * @return
     */
    @RequestMapping("getIngredientsInById")
    @ResponseBody
    public String getIngredientsInById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            IngredientsIn ingredientsIn = ingredientsService.getInById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(ingredientsIn);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    @RequestMapping("addIngredientsIn")
    @ResponseBody
    public String addIngredientsIn(@RequestBody IngredientsIn ingredientsIn) {
        JSONObject res = new JSONObject();
        try {
            ingredientsService.addIn(ingredientsIn);
            res.put("status", "success");
            res.put("message", "新建入库单成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新建入库单失败");
        }
        return res.toString();
    }

    @RequestMapping("loadPageIngredientsInList")
    @ResponseBody
    public String loadPageIngredientsInList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<IngredientsIn> ingredientsInList = ingredientsService.listPageIn(page);
            JSONArray data = JSONArray.fromArray(ingredientsInList.toArray(new IngredientsIn[ingredientsInList.size()]));
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
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalIngredientsInRecord")
    @ResponseBody
    public int totalIngredientsInRecord() {
        try {
            return ingredientsService.countIn();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入
     * @param excelFile
     * @return
     */
    @RequestMapping("importIngredientsInExcel")
    @ResponseBody
    public String importIngredientsInExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            System.out.println("数据如下：");
            for (int i = 1; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }

            res.put("status", "success");
            res.put("message", "导入成功");
        } catch(
                Exception e)

        {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 获取查询总数
     *
     * @param ingredientsIn
     * @return
     */
    @RequestMapping("searchIngredientsInTotal")
    @ResponseBody
    public int searchIngredientsInTotal(@RequestBody IngredientsIn ingredientsIn) {
        try {
            return ingredientsService.searchInCount(ingredientsIn);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param ingredientsIn
     * @return
     */
    @RequestMapping("searchIngredientsIn")
    @ResponseBody
    public String searchIngredientsIn(@RequestBody IngredientsIn ingredientsIn) {
        JSONObject res = new JSONObject();
        try {
            List<IngredientsIn> ingredientsInList = ingredientsService.searchIn(ingredientsIn);
            JSONArray data = JSONArray.fromArray(ingredientsInList.toArray(new IngredientsIn[ingredientsInList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 作废功能
     * @param id
     * @return
     */
    @RequestMapping("invalidIngredientsIn")
    @ResponseBody
    public String invalidIngredientsIn(String id) {
        JSONObject res = new JSONObject();
        try {
            ingredientsService.invalidIn(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    /**
     * 获取状态列表
     * @return
     */
    @RequestMapping("getIngredientsInSeniorSelectedList")
    @ResponseBody
    public String getIngredientsInSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild,CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

}
