package com.jdlink.service;

import com.jdlink.domain.Produce.Compatibility;

import java.util.List;

public interface CompatibilityService {
    int total();
    Compatibility getByCompatibilityId(String pwId);
    int getLastId();
    List<String> check();
    void updateCompatibility(String compatibilityId,String id,String id2);
    List<String> check1();
    List<Compatibility> list(String compatibilityId);
    Compatibility getByPwId1(String pwId);
    void  approval(String pwId,String opinion);
    void  back(String pwId,String opinion);
    void  cancel(String pwId);
    List<Compatibility> search(Compatibility compatibility);
}
