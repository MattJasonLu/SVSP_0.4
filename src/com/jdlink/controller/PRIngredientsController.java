package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
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
     *
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
     *
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
            Map<String, IngredientsIn> map = new HashMap<>();
            float totalPrice = 0;
            int serialNumber = 0;    // 序号
            List<Ingredients> ingredientsList = new ArrayList<>();
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new IngredientsIn());
                    map.get(id).setId(id);
                    map.get(id).setCompanyName(data[i][1].toString());
                    map.get(id).setFileId(data[i][2].toString());
                    map.get(id).setBookkeeper(data[i][3].toString());
                    map.get(id).setApprover(data[i][4].toString());
                    map.get(id).setKeeper(data[i][5].toString());
                    map.get(id).setAcceptor(data[i][6].toString());
                    map.get(id).setHandlers(data[i][7].toString());
                    //新存储一个id对象时，将以下两个累计数据清零
                    totalPrice = 0;
                    ingredientsList = new ArrayList<>();
                    serialNumber = 0;
                }
                serialNumber++;
                Ingredients ingredients = new Ingredients();
                ingredients.setSerialNumber(serialNumber + "");
                ingredients.setName(data[i][8].toString());
                ingredients.setUnitPrice(Float.parseFloat(data[i][9].toString()));
                ingredients.setAmount(Float.parseFloat(data[i][10].toString()));
                ingredients.setWareHouseName(data[i][11].toString());
                ingredients.setPost(data[i][12].toString());
                ingredients.setSpecification(data[i][13].toString());
                ingredients.setUnit(data[i][14].toString());
                ingredients.setRemarks(data[i][15].toString());
                float total = Float.parseFloat(data[i][9].toString()) * Float.parseFloat(data[i][10].toString());
                ingredients.setTotalPrice(total);
                ingredients.setId(id);
                ingredientsList.add(ingredients);
                map.get(id).setIngredientsList(ingredientsList);
                totalPrice += total;
                map.get(id).setTotalPrice(totalPrice);
            }
            for (String key : map.keySet()) {
                IngredientsIn ingredientsIn1 = ingredientsService.getInById(map.get(key).getId());
                IngredientsIn ingredientsIn = map.get(key);
                if (ingredientsIn1 == null) {
                    //插入新数据
                    ingredientsService.addIn(ingredientsIn);
                } else {
                    //根据id更新数据
                    ingredientsService.updateIn(ingredientsIn);
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
     *
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
     *
     * @return
     */
    @RequestMapping("getIngredientsInSeniorSelectedList")
    @ResponseBody
    public String getIngredientsInSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }
     /////////////领料单//////////////////////

    /**
     * 获取当前焚烧单编号
     *
     * @return
     */
    @RequestMapping("getCurrentReceivegredientsInId")
    @ResponseBody
    public String getCurrentReceivegredientsInId() {
        // 生成焚烧工单号 yyyyMM00000
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
        String prefix = simpleDateFormat.format(date);
        int count = ingredientsService.countReceiveById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0000" + count;
        else if (count > 9 && count <= 99) suffix = "000" + count;
        else if (count > 99 && count <= 999) suffix = "00" + count;
        else if (count > 999 && count <= 9999) suffix = "0" + count;
        else suffix = "" + count;
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (ingredientsService.getReceiveById(id) != null) {
            int index = Integer.parseInt(suffix);
            index += 1;
            if (index <= 9) suffix = "0000" + index;
            else if (index > 9 && index <= 99) suffix = "000" + index;
            else if (index > 99 && index <= 999) suffix = "00" + index;
            else if (index > 999 && index <= 9999) suffix = "0" + index;
            else suffix = "" + index;
            id = RandomUtil.getAppointId(prefix, suffix);
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
    @RequestMapping("getIngredientsReceiveById")
    @ResponseBody
    public String getIngredientsReceiveById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            IngredientsReceive ingredientsReceive = ingredientsService.getReceiveById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(ingredientsReceive);
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

    @RequestMapping("addIngredientsReceive")
    @ResponseBody
    public String addIngredientsReceive(@RequestBody IngredientsReceive ingredientsReceive) {
        JSONObject res = new JSONObject();
        try {
            ingredientsService.addReceive(ingredientsReceive);
            res.put("status", "success");
            res.put("message", "新建成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新建失败");
        }
        return res.toString();
    }

    @RequestMapping("loadPageIngredientsReceiveList")
    @ResponseBody
    public String loadPageIngredientsReceiveList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<IngredientsReceive> ingredientsReceiveList = ingredientsService.listPageReceive(page);
            JSONArray data = JSONArray.fromArray(ingredientsReceiveList.toArray(new IngredientsReceive[ingredientsReceiveList.size()]));
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
     *
     * @return
     */
    @RequestMapping("totalIngredientsReceiveRecord")
    @ResponseBody
    public int totalIngredientsReceiveRecord() {
        try {
            return ingredientsService.countReceive();
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
    @RequestMapping("importIngredientsReceiveExcel")
    @ResponseBody
    public String importIngredientsReceiveExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            System.out.println("数据如下：");
            for (int i = 0; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }
            Map<String, IngredientsReceive> map = new HashMap<>();
            float totalAmount = 0;
            int serialNumber = 0;    // 序号
            List<Ingredients> ingredientsList = new ArrayList<>();
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new IngredientsReceive());
                    map.get(id).setId(id);
                    map.get(id).setDepartment(data[i][1].toString());
                    map.get(id).setFileId(data[i][2].toString());
                    map.get(id).setKeeper(data[i][3].toString());
                    map.get(id).setVicePresident(data[i][4].toString());
                    map.get(id).setWarehouseSupervisor(data[i][5].toString());
                    map.get(id).setPickingSupervisor(data[i][6].toString());
                    map.get(id).setPickingMan(data[i][7].toString());
                    //新存储一个id对象时，将以下两个累计数据清零
                    totalAmount = 0;
                    ingredientsList = new ArrayList<>();
                    serialNumber = 0;
                }
                serialNumber++;
                Ingredients ingredients = new Ingredients();
                ingredients.setSerialNumber(serialNumber + "");
                ingredients.setName(data[i][8].toString());
                ingredients.setReceiveAmount(Float.parseFloat(data[i][9].toString()));
                ingredients.setWareHouseName(data[i][10].toString());
                ingredients.setSpecification(data[i][11].toString());
                ingredients.setUnit(data[i][12].toString());
                ingredients.setRemarks(data[i][13].toString());
                ingredients.setId(id);
                float amount = 0;
                float receiveAmount = 0;
                //计算该物品在该仓库的总入库数和总已领取数
                //通过仓库名和物品名查询库存量
                for(Ingredients ingredients1 : ingredientsService.getAmountAndReceive(ingredients)){
                    amount += ingredients1.getAmount();
                    receiveAmount += ingredients1.getReceiveAmount();
                }
                //总余量=总入库数 - 总已领取数
                float totalUseAmount = amount - receiveAmount;
                if(ingredients.getReceiveAmount() == totalUseAmount){
                    //设置可领料数为0，代表全部领取
                    ingredients.setNotReceiveAmount(0);
                }else if(ingredients.getReceiveAmount() == totalUseAmount){
                    //设置可领料数为1，代表部分领取
                    ingredients.setNotReceiveAmount(1);
                }
                ingredientsList.add(ingredients);
                map.get(id).setIngredientsList(ingredientsList);
                totalAmount += Float.parseFloat(data[i][9].toString());
                map.get(id).setTotalAmount(totalAmount);
            }
            for (String key : map.keySet()) {
                IngredientsReceive ingredientsReceive = map.get(key);
                //计算每单每个物品在各个仓库的领料数是否小于库存量
                for(Ingredients ingredients : ingredientsReceive.getIngredientsList()){
                    float amount = 0;
                    float receiveAmount = 0;
                    //计算该物品在该仓库的总入库数和总已领取数
                    //通过仓库名和物品名查询库存量
                    for(Ingredients ingredients1 : ingredientsService.getAmountAndReceive(ingredients)){
                        amount += ingredients1.getAmount();
                        receiveAmount += ingredients1.getReceiveAmount();
                    }
                    //总余量=总入库数 - 总已领取数
                    float totalUseAmount = amount - receiveAmount;
                    if(ingredients.getReceiveAmount() > totalUseAmount){
                        res.put("status", "fail");
                        res.put("message", ingredients.getWareHouseName()+"中"+ingredients.getName()+"库存不足,请重新确认领料数量！");
                        return res.toString();
                    }
                }
                IngredientsReceive ingredientsReceive1 = ingredientsService.getReceiveById(map.get(key).getId());
                if (ingredientsReceive1 == null) {
                    //插入新数据
                    ingredientsService.addAllReceive(ingredientsReceive);
                } else {
                    //根据id更新数据
                    ingredientsService.updateReceive(ingredientsReceive);
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

    /**
     * 获取查询总数
     *
     * @param
     * @return
     */
    @RequestMapping("searchIngredientsReceiveTotal")
    @ResponseBody
    public int searchIngredientsReceiveTotal(@RequestBody IngredientsReceive ingredientsReceive) {
        try {
            return ingredientsService.searchReceiveCount(ingredientsReceive);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchIngredientsReceive")
    @ResponseBody
    public String searchIngredientsIn(@RequestBody IngredientsReceive ingredientsReceive) {
        JSONObject res = new JSONObject();
        try {
            List<IngredientsReceive> ingredientsReceiveList = ingredientsService.searchReceive(ingredientsReceive);
            JSONArray data = JSONArray.fromArray(ingredientsReceiveList.toArray(new IngredientsReceive[ingredientsReceiveList.size()]));
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
     *
     * @param id
     * @return
     */
    @RequestMapping("invalidIngredientsReceive")
    @ResponseBody
    public String invalidIngredientsReceive(String id) {
        JSONObject res = new JSONObject();
        try {
            ingredientsService.invalidReceive(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }
}
