package com.jdlink.mapper;

import com.jdlink.domain.Produce.Compatibility;

import java.util.List;

public interface CompatibilityMapper {
    int total();
    Compatibility getByCompatibilityId(String pwId);
    int getLastId();
    List<String> check();
    List<String> check1();
    void updateCompatibility(String compatibilityId,String id,String id2);
    List<Compatibility> list(String compatibilityId);
}
