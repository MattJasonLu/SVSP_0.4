package com.jdlink.service;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Wastes;

public interface MaterialRequireService {
    int total();
    void  addMix(MaterialRequire materialRequire);
}
