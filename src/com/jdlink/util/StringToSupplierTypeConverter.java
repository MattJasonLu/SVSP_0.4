package com.jdlink.util;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.SupplierType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToSupplierTypeConverter implements Converter<String, SupplierType> {
    @Override
    public SupplierType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return SupplierType.get(index);
    }
}
