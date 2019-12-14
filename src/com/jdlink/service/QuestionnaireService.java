package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Questionnaire;
import com.jdlink.domain.QuestionnaireAdmin;

import java.util.List;

/**
 * Created by matt on 2018/4/28.
 */
public interface QuestionnaireService {
    List<Questionnaire> list();
    List<Questionnaire> search(String keyword);
    List<Questionnaire> listPage(Page page);
    Questionnaire getById(String questionnaireId);
    List<Questionnaire> getByClientId(String clientId);
    List<QuestionnaireAdmin> listQuestionnaireAdmin();
    void add(Questionnaire questionnaire);
    void delete(String questionnaireId);
    void update(Questionnaire questionnaire);
    int count();
    void signIn(String questionnaireId);
    void updateAttachmentUrl(Questionnaire questionnaire);
    void back(Questionnaire questionnaire);
    void examine(Questionnaire questionnaire);
    List<Questionnaire> searchQuestionnaireManage(Questionnaire questionnaire);
    void submitQuestionnaire(String questionnaireId);
    void toSubmitQuestionnaire(String questionnaireId);
}
