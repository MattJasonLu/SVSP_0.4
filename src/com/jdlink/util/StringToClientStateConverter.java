package com.jdlink.util;

import com.jdlink.domain.ApplicationStatus;
import com.jdlink.domain.ClientState;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToClientStateConverter implements Converter<String, ClientState> {
    @Override
    public ClientState convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        System.out.println("调用了StringToApplicationStatusConverter");
        return ClientState.get(index);
    }
}
