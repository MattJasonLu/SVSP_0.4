package com.jdlink.mapper.dictionary;

import com.jdlink.domain.Dictionary.SecondaryCategory;

import java.util.List;

public interface SecondaryCategoryMapper {
     /**
      * 列出所有次生类别
      * @return 次生列表
      */
     List<SecondaryCategory> list();

     /**
      * 通过代码获取次生类别
      * @param code 代码
      * @return 次生类别
      */
     SecondaryCategory getByCode(String code);

}
