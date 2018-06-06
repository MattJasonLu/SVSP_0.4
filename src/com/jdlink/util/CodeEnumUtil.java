package com.jdlink.util;

/**
 * Created by matt on 2018/5/8.
 */
public class CodeEnumUtil {
    /**
     * @param enumClass
     * @param code
     * @param <E>
     * @return
     */
    public static <E extends Enum<?> & CodeBaseEnum> E codeOf(Class<E> enumClass, int code) {
        E[] enumConstants = enumClass.getEnumConstants();
        for (E e : enumConstants) {
            if (e.code() == code)
                return e;
        }
        return null;
    }
}
