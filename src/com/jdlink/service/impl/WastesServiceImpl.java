package com.jdlink.service.impl;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.Parameter;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.WastesMapper;
import com.jdlink.service.WastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/8/10.
 * DoubleClickTo 666
 */
@Service
public class WastesServiceImpl implements WastesService {

    @Autowired
    WastesMapper wastesMapper;

    @Override
    public List<Wastes> list() {
        List<Wastes> wastesList = wastesMapper.list();
        for (Wastes wastes : wastesList) {
            for (MixingElement mixingElement : wastes.getParameterList()) {
                if (mixingElement.getParameter() != null) {
                    if (mixingElement.getParameter().equals(Parameter.Heat)) {
                        wastes.setCalorific(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.PH)) {
                        wastes.setPh(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.Ash)) {
                        wastes.setAshPercentage(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.WaterContent)) {
                        wastes.setWetPercentage(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.ChlorineContent)) {
                        wastes.setChlorinePercentage(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.SulfurContent)) {
                        wastes.setSulfurPercentage(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.PhosphorusContent)) {
                        wastes.setPhosphorusPercentage(mixingElement.getAverage());
                    } else if (mixingElement.getParameter().equals(Parameter.FluorineContent)) {
                        wastes.setFluorinePercentage(mixingElement.getAverage());
                    }
                }
            }

        }
        return wastesList;
    }

    @Override
    public Wastes getByName(String name){ return wastesMapper.getByName(name); }

    @Override
    public void add(Wastes wastes) {
        wastesMapper.add(wastes);
    }
}
