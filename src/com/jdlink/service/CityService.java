package com.jdlink.service;

import com.jdlink.domain.City;

import java.util.List;

public interface CityService {
    List<City> getCity(String provinceId);
    List<City> listCity();
}
