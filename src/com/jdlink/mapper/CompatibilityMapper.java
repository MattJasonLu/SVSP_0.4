package com.jdlink.mapper;

import com.jdlink.domain.Produce.Compatibility;

public interface CompatibilityMapper {
    int total();
    Compatibility getByCompatibilityId(String pwId);
}
