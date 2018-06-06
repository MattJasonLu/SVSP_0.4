package com.jdlink.util;

import com.jdlink.domain.ChemicalType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToChemicalTypeConverter implements Converter<String, ChemicalType> {
    @Override
    public ChemicalType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return ChemicalType.get(index);
    }
}
