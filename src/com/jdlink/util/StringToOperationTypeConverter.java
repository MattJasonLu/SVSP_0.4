package com.jdlink.util;

import com.jdlink.domain.EnterpriseType;
import com.jdlink.domain.OperationType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToOperationTypeConverter implements Converter<String, OperationType> {
    @Override
    public OperationType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return OperationType.get(index);
    }
}
