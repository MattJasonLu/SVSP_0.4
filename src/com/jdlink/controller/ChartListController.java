package com.jdlink.controller;

import com.jdlink.domain.City;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.service.CityService;
import com.jdlink.service.ClientService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ChartListController {

    @Autowired
    ClientService clientService;
    @Autowired
    CityService cityService;

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


}
