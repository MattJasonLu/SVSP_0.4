package com.jdlink.util;

import com.jdlink.domain.OperationRecord;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToOperationRecordConverter implements Converter<String, OperationRecord> {
    @Override
    public OperationRecord convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        return OperationRecord.get(index);
    }
}
