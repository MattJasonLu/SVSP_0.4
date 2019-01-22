package com.jdlink.controller;

import com.jdlink.domain.City;
import com.jdlink.domain.Client;
import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Ingredients;
import com.jdlink.domain.Produce.Secondary;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.QuotationItem;
import com.jdlink.service.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ChartListController {

    @Autowired
    ClientService clientService;
    @Autowired
    CityService cityService;
    @Autowired
    InboundService inboundService;
    @Autowired
    MedicalWastesService medicalWastesService;
    @Autowired
    OutboundOrderService outboundOrderService;
    @Autowired
    IngredientsService ingredientsService;
    @Autowired
    ContractService contractService;


    /**
     * 获取产废单位饼图数据
     * @return
     */
    @RequestMapping("getCityOfProduceCompanyNumber")
    @ResponseBody
    public String getCityOfProduceCompanyNumber() {
        JSONObject res = new JSONObject();
        try {
            List<Client> clientList = clientService.list();  // 获取所有产废单位
            List<City> cityList = cityService.listCity();    // 获取城市
            List<City> cityNumberList = new ArrayList<>();   // 用于承装城市和相应的产废单位数
            Map<String, City> map = new HashMap<>();
            for(Client client : clientList) {
                boolean isSearched = false;   // 是否查到该单位相应的城市
                for(City city : cityList) {
                    String name = city.getCityName();  // 城市名
                    if(client.getCompanyName().contains(name)) {   // 如果该产废单位名中包含该城市名
                        isSearched = true;
                        if (!map.keySet().contains(name)) {  // map中不存在该城市
                            map.put(name, new City());
                            map.get(name).setNumber(1);
                            map.get(name).setCityName(name);
                        }else {
                            int number = map.get(name).getNumber();
                            number++;
                            map.get(name).setNumber(number);
                        }
                    }
                }
                if(!isSearched) {  // 设置其他的数量加1
                    if (!map.keySet().contains("其他")) {  // map中不存在该城市则设置为其他
                        map.put("其他", new City());
                        map.get("其他").setNumber(1);
                        map.get("其他").setCityName("其他");
                    }else {
                        int number = map.get("其他").getNumber();
                        number++;
                        map.get("其他").setNumber(number);
                    }
                }
            }
            for (String key : map.keySet()) {   // 将城市，数量添加到数组
                City city = new City();
                city.setNumber(map.get(key).getNumber());
                city.setCityName(map.get(key).getCityName());
                cityNumberList.add(city);
            }
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(cityNumberList.toArray(new City[cityNumberList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "城市数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "城市数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }


    /**
     * 获取统计图表数据
     * @return
     */
    @RequestMapping("searchChartList")
    @ResponseBody
    public String searchChartList(Date startDate,Date endDate) {
        JSONObject res = new JSONObject();
        try {
            if(startDate == null && endDate == null) {  // 默认时间为当前日期的近六月
                startDate = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.add(Calendar.MONTH, -6);//当前时间前去6个月，即6个月前的时间
                endDate = calendar.getTime();  // 设置endDate为六月前时间
            }
            // 根据日期范围获取各板块按年月分组的数量/日期数据
            List<OutboundOrder> wastesOutboundOrderList = outboundOrderService.getWastesOutboundOrderItemAmountByRange(startDate,endDate);  // 获取危废出库数量和日期数据
            List<OutboundOrder> secondOutboundOrderList = outboundOrderService.getSecondOutboundOrderItemAmountByRange(startDate, endDate); // 获取次生出库数量和日期数据
            List<InboundOrderItem> inboundOrderItemList = inboundService.getWastesInboundOrderItemAmountByRange(startDate,endDate);  // 根据日期获取危废入库数量和日期数据
            List<InboundOrderItem> secondInboundOrderItemList = inboundService.getSecondInboundOrderItemAmountByRange(startDate,endDate); // 获取次生入库数量和日期数据
            List<Ingredients> ingredientsInList = ingredientsService.getIngredientsInItemAmountByRange(startDate,endDate);  // 获取辅料入库数量和日期数据
            List<Ingredients> ingredientsOutList = ingredientsService.getIngredientsOutItemAmountByRange(startDate,endDate);   // 获取辅料出库数量和日期数据
            List<QuotationItem> contractItemList = contractService.getQuotationItemByRange(startDate,endDate);   // 获取合同合约量即签订日期数据
            JSONArray array1 = JSONArray.fromArray(wastesOutboundOrderList.toArray(new OutboundOrder[wastesOutboundOrderList.size()]));
            JSONArray array2 = JSONArray.fromArray(secondOutboundOrderList.toArray(new OutboundOrder[secondOutboundOrderList.size()]));
            JSONArray array3 = JSONArray.fromArray(inboundOrderItemList.toArray(new InboundOrderItem[inboundOrderItemList.size()]));
            JSONArray array4 = JSONArray.fromArray(secondInboundOrderItemList.toArray(new InboundOrderItem[secondInboundOrderItemList.size()]));
            JSONArray array5 = JSONArray.fromArray(ingredientsInList.toArray(new Ingredients[ingredientsInList.size()]));
            JSONArray array6 = JSONArray.fromArray(ingredientsOutList.toArray(new Ingredients[ingredientsOutList.size()]));
            JSONArray array7 = JSONArray.fromArray(contractItemList.toArray(new QuotationItem[contractItemList.size()]));
            res.put("wastesOutboundOrderList", array1);
            res.put("secondOutboundOrderList", array2);
            res.put("inboundOrderItemList", array3);
            res.put("secondInboundOrderItemList", array4);
            res.put("ingredientsInList", array5);
            res.put("ingredientsOutList", array6);
            res.put("contractItemList", array7);
            res.put("status", "success");
            res.put("message", "数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

}
