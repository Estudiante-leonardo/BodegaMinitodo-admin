package com.tuempresa.bodegaleoncito.infrastructure.security;

import com.tuempresa.bodegaleoncito.domain.usuario.Role;
import com.tuempresa.bodegaleoncito.domain.usuario.RoleRepository;
import com.tuempresa.bodegaleoncito.domain.usuario.Usuario;
import com.tuempresa.bodegaleoncito.domain.usuario.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;

    public UserDetailsServiceImpl(UsuarioRepository usuarioRepository, RoleRepository roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        String roleName = roleRepository.findById(usuario.getRolId())
                .map(Role::getNombre)
                .orElseThrow(() -> new UsernameNotFoundException("Rol no encontrado para el usuario: " + username));

        return new UserDetailsImpl(usuario, roleName);
    }
}
