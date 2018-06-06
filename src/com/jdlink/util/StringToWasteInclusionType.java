package com.jdlink.util;

import com.jdlink.domain.ApplicationStatus;
import com.jdlink.domain.WasteInclusionType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToWasteInclusionType implements Converter<String, WasteInclusionType> {
    @Override
    public WasteInclusionType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return WasteInclusionType.get(index);
    }
}
