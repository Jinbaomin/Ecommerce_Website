package org.example.myproject.services.specifications;

import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class SpecificationCombiner {
    public static <T> Specification<T> and(List<Specification<T>> spec) {
        return spec.stream()
                .reduce(Specification.where(null), Specification::and);
    }

    public static <T> Specification<T> or(List<Specification<T>> spec) {
        return spec.stream()
                .reduce(Specification.where(null), Specification::or);
    }
}
