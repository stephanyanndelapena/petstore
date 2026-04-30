package com.delapena.petstore.catalog;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PetRepositoryCustomImpl implements PetRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Pet> findByFilters(String species, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Pet> cq = cb.createQuery(Pet.class);
        Root<Pet> root = cq.from(Pet.class);

        List<Predicate> preds = new ArrayList<>();
        if (species != null && !species.isEmpty()) {
            preds.add(cb.equal(root.get("species"), species));
        }
        if (minPrice != null) {
            preds.add(cb.ge(root.get("priceCents"), minPrice));
        }
        if (maxPrice != null) {
            preds.add(cb.le(root.get("priceCents"), maxPrice));
        }
        if (availability != null && !availability.isEmpty()) {
            preds.add(cb.equal(root.get("availabilityStatus"), availability));
        }

        // deterministic ordering: createdAt DESC, id ASC
        cq.where(preds.toArray(new Predicate[0]));
        cq.orderBy(cb.desc(root.get("createdAt")), cb.asc(root.get("id")));

        TypedQuery<Pet> query = em.createQuery(cq);

        // Simple cursor-as-offset strategy: cursor contains numeric offset. If absent, offset=0.
        int offset = 0;
        if (cursor != null) {
            try { offset = Integer.parseInt(cursor); } catch (NumberFormatException ignored) { offset = 0; }
        }
        query.setFirstResult(offset);
        query.setMaxResults(limit);

        return query.getResultList();
    }
}
