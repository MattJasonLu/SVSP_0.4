package com.jdlink.util;

import com.jdlink.domain.EnterpriseType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToEnterpriseTypeConverter implements Converter<String, EnterpriseType> {
    @Override
    public EnterpriseType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return EnterpriseType.get(index);
    }
}
