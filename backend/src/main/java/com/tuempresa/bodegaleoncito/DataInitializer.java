package com.tuempresa.bodegaleoncito;

import com.tuempresa.bodegaleoncito.domain.usuario.Role;
import com.tuempresa.bodegaleoncito.domain.usuario.RoleRepository;
import com.tuempresa.bodegaleoncito.domain.usuario.Usuario;
import com.tuempresa.bodegaleoncito.domain.usuario.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            if (roleRepository.findByNombre("admin").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setNombre("admin");
                roleRepository.save(adminRole);
            }
            if (roleRepository.findByNombre("usuario").isEmpty()) {
                Role userRole = new Role();
                userRole.setNombre("usuario");
                roleRepository.save(userRole);
            }
            if (roleRepository.findByNombre("caja").isEmpty()) {
                Role cajaRole = new Role();
                cajaRole.setNombre("caja");
                roleRepository.save(cajaRole);
            }

            if (usuarioRepository.findByUsername("admin").isEmpty()) {
                Role adminRole = roleRepository.findByNombre("admin").orElseThrow();

                Usuario adminUser = new Usuario();
                adminUser.setUsername("admin");
                adminUser.setNombre("Administrador");
                adminUser.setPassword(passwordEncoder.encode("admin123"));
                adminUser.setEmail("admin@bodegaleoncito.com");
                adminUser.setRolId(adminRole.getId());

                usuarioRepository.save(adminUser);
            }
        } catch (Exception e) {
            System.out.println("Data initialization skipped due to existing data or constraints: " + e.getMessage());
        }
    }
}
