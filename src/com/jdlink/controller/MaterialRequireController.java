package com.jdlink.controller;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Produce.Parameter;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.domain.Wastes;
import com.jdlink.service.CompatibilityService;
import com.jdlink.service.MaterialRequireService;
import com.jdlink.service.ThresholdService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

import static com.jdlink.domain.PackageType.*;

@Controller
public class MaterialRequireController {
    @Autowired
    MaterialRequireService materialRequireService;
    @Autowired
    CompatibilityService compatibilityService;
    @Autowired
    ThresholdService thresholdService;
    @RequestMapping("generateSheet")
    @ResponseBody
    public  String generateSheet(){
        //1首先获得最新的物料编号 即页面显示的配伍单号
        List<String> compatibilityIdList=compatibilityService.check1();
        //最新的一个配伍编号
        String compatibilityId=compatibilityIdList.get(0);
        //根据最新的配伍编号查找配伍计划表
        List<Compatibility> compatibilityList=compatibilityService.list(compatibilityId);
//        for (Compatibility c:compatibilityList
//             ) {
//            System.out.println(c+" ");
//        }
        //2获得基础数据阈值表的数据
        List<Threshold> thresholdList = thresholdService.list();
        //3获得之后在后台进行拼接
        // 参数列表
        List<List<MixingElement>> lists=new ArrayList<>();
        List<MixingElement> parameterList = new ArrayList<>();
        List<Wastes> wastesList=new ArrayList<>();
        MixingElement parameter = new MixingElement();
        for(int i=0;i<compatibilityList.size();i++){
            MaterialRequire materialRequire=new MaterialRequire();
            Wastes wastes=new Wastes();//危废信息
            //1查找最大序号，如果为空就为"1"
            int total=materialRequireService.total();
            //设置序号
            if(total==0){
                materialRequire.setMaterialRequireId("1");
            }else {
                materialRequire.setMaterialRequireId(String.valueOf(total+1));
            }
            //对包装方式进行判断
            //污泥+半固态==>标准箱
            if(compatibilityList.get(i).getHandleCategory().toString()=="Sludge"&&compatibilityList.get(i).getFormType().toString()=="HalfSolid"){
             wastes.setPackageType(Box);
            }
            //废液+液态==>吨箱
            else if(compatibilityList.get(i).getHandleCategory().toString()=="WasteLiquid"&&compatibilityList.get(i).getFormType().toString()=="Liquid"){
                wastes.setPackageType(Ton);
            }
            //散装料+固态==>吨袋
            else if(compatibilityList.get(i).getHandleCategory().toString()=="Bulk"&&compatibilityList.get(i).getFormType().toString()=="Solid"){
                wastes.setPackageType(Bag);
            }
            //破碎料+固态==>标准箱
            else if(compatibilityList.get(i).getHandleCategory().toString()=="Crushing"&&compatibilityList.get(i).getFormType().toString()=="Solid"){
                wastes.setPackageType(Box);
            }
            //精馏残渣
            else if(compatibilityList.get(i).getHandleCategory().toString()=="Distillation"){
                //固态/半固态==>铁桶
                if(compatibilityList.get(i).getFormType().toString()=="Solid"||compatibilityList.get(i).getFormType().toString()=="HalfSolid"){
                    wastes.setPackageType(Iron);
                }
                //液态==>吨箱
                if(compatibilityList.get(i).getFormType().toString()=="Liquid"){
                    wastes.setPackageType(Ton);
                }
            }
            //悬挂连==>小袋
            else if(compatibilityList.get(i).getHandleCategory().toString()=="Suspension"){
                wastes.setPackageType(Pouch);
            }
            else {
                wastes.setPackageType(Ton);
            }
           // System.out.println(wastes+"CCC");
            //最值摄入
            //1获得当前配屋计划的热值
            Threshold threshold=thresholdService.getByHandleCategory(compatibilityList.get(i).getHandleCategory().toString());
            parameter.setId(RandomUtil.getRandomEightNumber());
            float calorific=compatibilityList.get(i).getCalorific();
            //获得基础数据阈值表对应进料方式的最大最小值
            //热值
            float calorificMax=calorific+threshold.getCalorificMax();
            float calorificMin=calorific-threshold.getCalorificMin();
            parameter.setParameter(Parameter.values()[3]);//设置热值
            parameter.setMinimum(calorificMin);
            parameter.setMaximum(calorificMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //灰分
            float ash=compatibilityList.get(i).getAsh();
            float ashMax=ash+threshold.getAshMax();
            float ashMin=ash-threshold.getAshMin();
            parameter.setParameter(Parameter.values()[4]);//设置灰分
            parameter.setMinimum(ashMin);
            parameter.setMaximum(ashMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //水分
            float water=compatibilityList.get(i).getWater();
            float waterMax=water+threshold.getWaterMax();
            float waterMin=water-threshold.getWaterMin();
            parameter.setParameter(Parameter.values()[8]);//设置灰分
            parameter.setMinimum(waterMin);
            parameter.setMaximum(waterMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //硫
            float s=compatibilityList.get(i).getS();
            float sMax=s+threshold.getsMax();
            float sMin=s-threshold.getsMin();
            parameter.setParameter(Parameter.values()[10]);//设置硫
            parameter.setMinimum(sMin);
            parameter.setMaximum(sMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //氯
            float cl=compatibilityList.get(i).getCL();
            float clMax=cl+threshold.getClMax();
            float clMin=cl-threshold.getClMin();
            parameter.setParameter(Parameter.values()[11]);//设置氯
            parameter.setMinimum(clMin);
            parameter.setMaximum(clMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //磷
            float p=compatibilityList.get(i).getP();
            float pMax=p+threshold.getpMax();
            float pMin=p-threshold.getpMin();
            parameter.setParameter(Parameter.values()[13]);//设置磷
            parameter.setMinimum(pMin);
            parameter.setMaximum(pMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //氟
            float f=compatibilityList.get(i).getF();
            float fMax=f+threshold.getfMax();
            float fMin=f-threshold.getfMin();
            parameter.setParameter(Parameter.values()[12]);//设置磷
            parameter.setMinimum(fMin);
            parameter.setMaximum(fMax);
            parameterList.add(parameter);
            lists.add(parameterList);
            //PH
            float ph=compatibilityList.get(i).getPH();
            float phMax=ph+threshold.getPhMax();
            float phMin=ph-threshold.getPhMin();
            parameter.setParameter(Parameter.values()[2]);//设置磷
            parameter.setMinimum(phMin);
            parameter.setMaximum(phMax);
           parameterList.add(parameter);
           lists.add(parameterList);
            System.out.println(lists+"BBB");
           System.out.println(parameterList+"BBB");
            wastes.setParameterList(parameterList);
            wastes.setWastesId(RandomUtil.getRandomEightNumber());
            wastesList.add(wastes);
            materialRequire.setWastesList(wastesList);
            materialRequire.setThreshold(threshold);
            materialRequire.setCompatibility(compatibilityList.get(i));
           // System.out.println(materialRequire+"AAA");
        }
        //4保存在数据库



        return null;
    }




}
