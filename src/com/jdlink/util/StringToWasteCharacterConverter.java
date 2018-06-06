package com.jdlink.util;

import com.jdlink.domain.WasteCharacter;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/23.
 */
public class StringToWasteCharacterConverter implements Converter<String, WasteCharacter> {
    @Override
    public WasteCharacter convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return WasteCharacter.get(index);
    }
}
