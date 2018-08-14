package com.jdlink.service;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface MaterialRequireService {
    int total();
    void  addMix(MaterialRequire materialRequire);
    List<String> check();
}
