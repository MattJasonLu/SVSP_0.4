package com.jdlink.mapper;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Wastes;

public interface MaterialRequireMapper {
    int total();
   void  addMix(MaterialRequire materialRequire);
}
