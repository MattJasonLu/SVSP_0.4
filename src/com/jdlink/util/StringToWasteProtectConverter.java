package com.jdlink.util;

import com.jdlink.domain.WasteProtect;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToWasteProtectConverter implements Converter<String, WasteProtect> {
    @Override
    public WasteProtect convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return WasteProtect.get(index);
    }
}
