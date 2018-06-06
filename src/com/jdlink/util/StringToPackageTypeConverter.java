package com.jdlink.util;

import com.jdlink.domain.ApplicationStatus;
import com.jdlink.domain.PackageType;
import org.springframework.core.convert.converter.Converter;

/**
 * Created by matt on 2018/4/24.
 */
public class StringToPackageTypeConverter implements Converter<String, PackageType> {
    @Override
    public PackageType convert(String s) {
        int index = Integer.parseInt(s);
        if (index == 0) {
            return null;
        }
        System.out.println("调用了StringToApplicationStatusConverter");
        return PackageType.get(index);
    }
}
