package lk.ijse.car_rental_system;


import lk.ijse.car_rental_system.config.WebAppConfig;
import lk.ijse.car_rental_system.config.WebRootConfig;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{WebRootConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebAppConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
