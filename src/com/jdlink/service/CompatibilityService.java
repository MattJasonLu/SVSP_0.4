package com.jdlink.service;

import com.jdlink.domain.Produce.Compatibility;

public interface CompatibilityService {
    int total();
    Compatibility getByCompatibilityId(String pwId);
}
