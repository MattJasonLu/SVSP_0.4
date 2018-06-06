package com.jdlink.util;

import com.jdlink.domain.OperationMode;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToOperationModeConverter implements Converter<String, OperationMode> {
    @Override
    public OperationMode convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return OperationMode.get(index);
    }
}
