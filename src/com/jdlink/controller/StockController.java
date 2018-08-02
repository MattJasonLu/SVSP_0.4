package com.jdlink.controller;
import com.jdlink.domain.Produce.Stock;
import com.jdlink.service.StockService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class StockController {
    @Autowired
    StockService stockService;
//添加申报信息
    @RequestMapping("addStock")
    @ResponseBody
    public String addStock(@RequestBody Stock stock) {
        JSONObject res=new JSONObject();
        try{
            stockService.add(stock);
            res.put("state","success");
        }
         catch (Exception e){
             res.put("state","fail");
         }

        return res.toString();
    }
}
