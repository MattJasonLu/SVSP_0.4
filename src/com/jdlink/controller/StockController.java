package com.jdlink.controller;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.Hazardous;
import com.jdlink.domain.Produce.Stock;
import com.jdlink.domain.Wastes;
import com.jdlink.service.StockService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class StockController {
    @Autowired
    StockService stockService;
//添加申报信息
    @RequestMapping("addStock")
    @ResponseBody
    public String addStock(@RequestBody Stock stock) {
        JSONObject res=new JSONObject();
        System.out.println(JSONObject.fromBean(stock).toString());
        //  1.获取库存申报ID
        List<String> list= stockService.getStockIdList();//合同id集合
        if(list.size()<=0){
            stock.setStockId("1");
        }
        if(list.size()>0) {
            List<Integer> list1 = new ArrayList<>();
            for (String s:list
                    ) {
                int i=Integer.parseInt(s);
                list1.add(i);
            }
            Collections.sort(list1);
            String newId= String.valueOf((list1.get(list1.size()-1)+1)) ;//当前编号
            stock.setStockId(newId);
        }
        stock.setCheckState(CheckState.ToSubmit);//设置为待提交
        // 设置每个危废的编码,唯一
        for (Wastes wastesList : stock.getWastes()) {
            wastesList.setId(RandomUtil.getRandomEightNumber());
            wastesList.setStockId(stock.getStockId());
            //System.out.println(JSONObject.fromBean(wastesList).toString());
        }
            stockService.add(stock);
            //res.put("state","success");


            // res.put("state","fail");

        return res.toString();
    }
}
