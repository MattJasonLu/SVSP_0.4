package com.jdlink.util;

import com.jdlink.domain.SmellType;
import com.jdlink.domain.Solubility;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToSolubilityConverter implements Converter<String, Solubility> {
    @Override
    public Solubility convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return Solubility.get(index);
    }
}
