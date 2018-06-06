package com.jdlink.util;

import com.jdlink.domain.FormType;
import com.jdlink.domain.SmellType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToSmellTypeConverter implements Converter<String, SmellType> {
    @Override
    public SmellType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return SmellType.get(index);
    }
}
