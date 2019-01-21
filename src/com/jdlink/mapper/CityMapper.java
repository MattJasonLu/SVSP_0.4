package com.jdlink.mapper;

import com.jdlink.domain.City;

import java.util.List;

public interface CityMapper {
     List<City> getCity(String provinceId) ;
     List<City> listCity();
}
