package com.jdlink.service;

import com.jdlink.domain.Produce.Compatibility;

import java.util.List;

public interface CompatibilityService {
    int total();
    Compatibility getByCompatibilityId(String pwId);
    int getLastId();
    List<String> check();
    void updateCompatibility(String compatibilityId,String id,String id2);
}
