package com.jdlink.util;

import com.jdlink.domain.ContingencyPlan;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToContingencyPlanConverter implements Converter<String, ContingencyPlan> {
    @Override
    public ContingencyPlan convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return ContingencyPlan.get(index);
    }
}
